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

2. Install Docker and Docker Compose on the VPS:

   ```bash
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Disable any pre-installed system Nginx** (VPS providers often include it):

   ```bash
   sudo systemctl disable nginx
   sudo systemctl stop nginx
   ```

   This prevents conflicts with the Docker Nginx container.

4. Set up SSL certificates with Certbot:

   ```bash
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx

    # For production
    sudo certbot certonly --standalone -d eagleeyeadvisory.us.com -d www.eagleeyeadvisory.us.com


   Certificates are generated at `/etc/letsencrypt/live/DOMAIN/` and automatically mounted in docker-compose files via the `./certbot/conf` volume.

   **Note:** If you already have certificates, you don't need to run certbot again. Certbot can also auto-renew certificates (they last 90 days).

   ```
