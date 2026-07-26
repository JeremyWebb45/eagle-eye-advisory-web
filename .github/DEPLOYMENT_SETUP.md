# CI/CD Deployment Setup

This project uses GitHub Actions to automatically deploy a monorepo to a DigitalOcean VPS (or any Linux VPS).

## GitHub Secrets Required

Set these in your GitHub repository settings (`Settings > Secrets and variables > Actions > New repository secret`):

- `VPS_HOST`: Your VPS IP address or domain (e.g., `192.168.1.100`)
- `VPS_USER`: SSH user on the VPS (usually `root` or a deploy user)
- `VPS_SSH_KEY`: Your private SSH key (generate with `ssh-keygen`, then paste the **entire contents** of the private key file, including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`)
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub access token (generate in Docker Hub > Account Settings > Security > New Access Token)
- `DB_PASSWORD`: A strong password for PostgreSQL (used for `postgres` user)

**Note:** The `DB_PASSWORD` is used to:

- Set the PostgreSQL user password on first database initialization
- Connect the API to the database at runtime
- Use the same password for both production and development (separate database names keep them isolated)

## Docker Hub & GitHub Secrets Setup

### Docker Hub Setup

1. Create a free Docker Hub account at https://hub.docker.com
2. Generate an access token:
   - Go to Account Settings > Security > New Access Token
   - Name it something like "GitHub Actions"
   - Select "Read, Write" permissions
   - Copy the token

### GitHub Secrets Setup

In your GitHub repository, go to **Settings > Secrets and variables > Actions** and add these secrets:

| Secret            | Value                        | Notes                                                                              |
| ----------------- | ---------------------------- | ---------------------------------------------------------------------------------- |
| `DOCKER_USERNAME` | Your Docker Hub username     | Used to tag and push images                                                        |
| `DOCKER_PASSWORD` | Your Docker Hub access token | The token generated above, NOT your Docker Hub password                            |
| `DB_PASSWORD`     | A strong random password     | Used for PostgreSQL user `postgres`. Use the same password for prod and dev.       |
| `VPS_HOST`        | Your VPS IP or domain        | e.g., `203.0.113.1` or `vps.example.com`                                           |
| `VPS_USER`        | SSH user on VPS              | Usually `root`                                                                     |
| `VPS_SSH_KEY`     | Your private SSH key         | Full contents of `~/.ssh/github` (include `-----BEGIN...` and `-----END...` lines) |

**⚠️ Important for `VPS_SSH_KEY`:**

- Generate with: `ssh-keygen -t ed25519 -f ~/.ssh/github -N ""`
- Paste the **entire contents** of `~/.ssh/github` (private key), not the `.pub` file
- Include all lines from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`

## How It Works

The CI/CD pipeline now uses GitHub Actions to build, push, and deploy Docker images:

1. **Code is pushed** to `main` (production) or `develop` (development branch)
2. **GitHub Actions:**
   - Creates env files in the runner with secrets from GitHub
   - Builds Docker images for frontend (from `frontend/`) and API (from `api/`) with env vars baked in
   - Pushes them to Docker Hub as `yourusername/g-and-j-wedding-frontend:main` and `yourusername/g-and-j-wedding-api:main`
   - SSH into VPS and pulls the pre-built images
   - Runs `docker-compose up -d` to start containers
3. **Your VPS** just runs the pre-built images (no build overhead, no env files needed)

This approach:

- **Saves VPS resources**: No building on your tiny VPS
- **Faster deployments**: Images are already built on GitHub's powerful servers
- **More reliable**: Build failures don't affect running services
- **Secure**: Secrets baked into images during build, no plaintext env files on VPS
- **Portable**: Pre-built images can run anywhere with Docker

## VPS Setup

1. **Set up SSH key for GitHub and GitHub Actions**:

   Generate an SSH key:

   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/github -N ""
   cat ~/.ssh/github.pub
   ```

   Copy the output (starts with `ssh-ed25519`), then:
   - Go to your GitHub repo: **Settings > Deploy Keys > Add deploy key**
   - Paste the public key and check "Allow write access"

   **Add the public key to VPS authorized_keys** (so GitHub Actions can SSH into the VPS):

   ```bash
   cat ~/.ssh/github.pub >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   ```

   These permissions are critical for SSH to work:
   - `~/.ssh` must be `700` (drwx------)
   - `~/.ssh/authorized_keys` must be `600` (-rw-------)
   - `~/.ssh/github` (private key) must be `600` (-rw-------)

   **Configure SSH to use this key for GitHub:**

   ```bash
   cat >> ~/.ssh/config << 'EOF'
   Host github.com
   IdentityFile ~/.ssh/github
   User git
   EOF
   chmod 600 ~/.ssh/config
   ```

   Test the connection to GitHub:

   ```bash
   ssh -T git@github.com
   ```

   Should say: `Hi YOUR_USERNAME! You've successfully authenticated...`

2. Clone the repository on the VPS using SSH:

   ```bash
   cd ~
   git clone git@github.com:JeremyWebb45/eagle-eye-advisory-web.git
   cd eagle-eye-advisory-web
   ```

3. **Disable any pre-installed system Nginx** (VPS providers often include it):

   ```bash
   sudo systemctl disable nginx
   sudo systemctl stop nginx
   ```

   This prevents conflicts with the Docker Nginx container.

4. Install Docker and Docker Compose on the VPS:

   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

5. **Environment files are created automatically by GitHub Actions during image build:**

   When you push to `main` (production) or `develop` (development), GitHub Actions will:
   - Create env files in the GitHub Actions runner (before building images)
     - `./frontend/.env` — frontend build/runtime env with API paths (`VITE_API_URL=/api`, `VITE_API_URL_SSR=http://prod_api:5000`, `VITE_API_INVITES_PATH=/invites`)
     - `./.env.services` — DB connection info for the API service (contains `POSTGRES_HOST=db`, `POSTGRES_PORT=5432`, `POSTGRES_USER=postgres`, `POSTGRES_PASSWORD` from GitHub Secrets, `POSTGRES_DB=g_and_j_wedding`)
   - Build Docker images with these env files baked in
   - Push the images to Docker Hub
   - SSH to VPS and pull the pre-built images
   - Restart services (no env files needed on VPS - everything is in the images)

   **The VPS does not create any env files.** All configuration is baked into the Docker images at build time.

6. Set up SSL certificates with Certbot:

   ```bash
   sudo apt-get update
   sudo apt-get install -y certbot python3-certbot-nginx

   # For production
   sudo certbot certonly --standalone -d eagleeyeadvisory.us.com -d www.eagleeyeadvisory.us.com

   # For development
   sudo certbot certonly --standalone -d development.g-and-j-wedding.com
   ```

   Certificates are generated at `/etc/letsencrypt/live/DOMAIN/` and automatically mounted in docker-compose files via the `./certbot/conf` volume.

   **Note:** If you already have certificates, you don't need to run certbot again. Certbot can also auto-renew certificates (they last 90 days).

7. **Verify setup** (optional, images won't exist until first build):

   ```bash
   # Test that docker-compose configuration is valid
   cd ~/g-and-j-wedding
   DOCKER_USERNAME=placeholder IMAGE_TAG=main docker-compose -f docker-compose.yml config | grep "image:" | head -10
   ```

   This displays the image names in the composed configuration. Once GitHub Actions builds and pushes images, deployment will work automatically.

**After VPS setup is complete:**

- Push code to `main` (production) or `develop` (development) branch
- GitHub Actions builds images and deploys them automatically
- First deployment may take 10-15 minutes (building images)
- Subsequent deployments take 30 seconds (just pulling pre-built images)
- Both environments run on the same VPS with a unified nginx instance
- Access them via separate domains:
  - Production: `https://g-and-j-wedding.com`
  - Development: `https://development.g-and-j-wedding.com`

## Architecture

The deployment uses a **unified docker-compose** with:

- 2 PostgreSQL databases (prod_postgres, dev_postgres)
- 2 API services (prod_api, dev_api)
- 2 Frontend services (prod_frontend, dev_frontend)
- 1 Nginx instance routing both domains

This provides:

- ✅ Efficient deployments (only restart the environment being updated)
- ✅ Isolated networks and volumes (prod and dev never interfere)
- ✅ Single entry point on port 443 (nginx routes by hostname)
- ✅ No port conflicts

## Workflows

### Production (`deploy-prod.yml`)

- Triggered on push to `main` branch
- Pulls only `prod_api` and `prod_frontend` images
- Restarts only production services (dev untouched)
- Runs `docker-compose -f docker-compose.yml`

### Development (`deploy-development.yml`)

- Triggered on push to `develop` branch
- Pulls only `dev_api` and `dev_frontend` images
- Restarts only development services (prod untouched)
- Runs `docker-compose -f docker-compose.yml`

## Manual Deployment

You can manually trigger a workflow in the GitHub Actions tab, or use the GitHub CLI:

```bash
gh workflow run deploy-prod.yml
gh workflow run deploy-development.yml
```

On the VPS, you can also manually manage specific environments:

```bash
# Production only (substitute your Docker Hub username and tag)
docker pull your-username/g-and-j-wedding-api:main
docker pull your-username/g-and-j-wedding-frontend:main
DOCKER_USERNAME=your-username IMAGE_TAG=main docker-compose up -d prod_api prod_frontend nginx

# Development only
docker pull your-username/g-and-j-wedding-api:develop
docker pull your-username/g-and-j-wedding-frontend:develop
DOCKER_USERNAME=your-username IMAGE_TAG=develop docker-compose up -d dev_api dev_frontend nginx
```

## Monitoring Logs

After deployment, check container logs:

```bash
# On the VPS
# Production services
docker-compose logs prod_api
docker-compose logs prod_frontend

# Development services
docker-compose logs dev_api
docker-compose logs dev_frontend

# Nginx (routes both)
docker-compose logs nginx
```

## Cloudflare SSL/TLS Configuration

Both environments use **Full** SSL mode (HTTPS on both edges):

1. Go to **Cloudflare Dashboard > SSL/TLS**
2. Set **Overview > SSL/TLS encryption mode** to **Full**
3. This requires valid certificates on your origin (VPS), which Certbot provides via Let's Encrypt

For DNS records, ensure:

- `g-and-j-wedding.com` A record points to your VPS IP
- `www.g-and-j-wedding.com` CNAME points to `g-and-j-wedding.com`
- `development.g-and-j-wedding.com` A record points to your VPS IP

## Troubleshooting

- **SSH key rejected**: Ensure the VPS_SSH_KEY secret contains the full private key (including `-----BEGIN ...-----` and `-----END ...-----` lines).
- **Git pull fails**: Verify SSH key is set up on VPS (`cat ~/.ssh/github.pub` should output a key) and that the public key is added as a GitHub deploy key. Test with `ssh -i ~/.ssh/github git@github.com`.
- **Docker daemon not running**: SSH into VPS and run `sudo systemctl start docker`.
- **Port already in use**: Check `sudo lsof -i :80` and `sudo lsof -i :443` for conflicts.
