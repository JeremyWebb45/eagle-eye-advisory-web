import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Construction, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex mt-14 justify-center bg-linear-to-br from-primary-light flex-1 w-full px-4">
      <ComingSoon />
    </div>
  );
}

function ComingSoon() {
  return (
    <Card className="h-fit w-full max-w-2xl text-(--primary-tan)">
      <CardHeader className="text-center">
        <div className="flex justify-center gap-2 mb-4">
          <Construction className="w-8 h-8 text-(--primary-red) animate-pulse" />
          🦕
          <Construction className="w-8 h-8 text-(--primary-red) animate-pulse" />
        </div>
        <CardTitle className="text-3xl text-(--primary-dark-green)">
          Coming Soon!
        </CardTitle>
        <CardDescription className="text-lg mt-2 text-(--primary-tan)">
          Our dino-mite wedding site is under construction
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4">
          <p className="text-(--primary-tan)">
            🦕 We're building something special for your big day! 🦕
          </p>
          <div className="flex justify-center">
            <Heart className="w-6 h-6 text-(--primary-red) animate-pulse" />
          </div>
          <p className="text-sm text">Check back soon to help us celebrate!</p>
        </div>
      </CardContent>
    </Card>
  );
}
