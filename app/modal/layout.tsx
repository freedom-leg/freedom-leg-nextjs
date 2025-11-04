import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freedom Leg - Hands-Free Crutch Alternative | Modal Version',
  description: 'Revolutionary hands-free crutch alternative. Complete off-loading for foot, ankle, lower leg, and knee injuries. Walk naturally with both hands free during recovery.',
  keywords: 'freedom leg, hands-free crutches, crutch alternative, knee walker alternative, iwalk alternative, non-weight bearing, foot surgery recovery, ankle surgery recovery',
  openGraph: {
    title: 'Freedom Leg - Walk Hands-Free During Recovery',
    description: 'Revolutionary hands-free crutch alternative. Takes 100% weight off your injured leg.',
    type: 'website',
    url: 'https://freedomleg.com/modal',
    images: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom-Leg-Hand-Holding-Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Freedom Leg hands-free mobility device',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freedom Leg - Walk Hands-Free During Recovery',
    description: 'Revolutionary hands-free crutch alternative. Takes 100% weight off your injured leg.',
    images: ['https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom-Leg-Hand-Holding-Photo.jpg'],
  },
};

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
