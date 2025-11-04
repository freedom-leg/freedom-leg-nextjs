import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Gallery() {
  const versions = [
    {
      id: 'modal',
      name: 'Modal Version',
      description: 'Content displayed in interactive modals with sticky footer navigation',
      path: '/modal',
      features: [
        'Sticky footer with persistent CTAs',
        'All content in modal overlays',
        'Minimal initial page load',
        'Best for focused conversions',
      ],
    },
    {
      id: 'hybrid',
      name: 'Hybrid Version',
      description: 'Combines inline content sections with modal interactions for key features',
      path: '/hybrid',
      features: [
        'Inline video testimonials',
        'Product comparison table',
        'How it works slideshow',
        'Modals for quiz and quick answers',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Freedom Leg Website Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different homepage versions with full SEO optimization. Each version is fully functional with all interactive features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {versions.map((version) => (
            <div
              key={version.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-[#0f766e] group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#0f766e] transition-colors">
                    {version.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {version.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {version.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <span className="text-[#0f766e] mr-2 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={version.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#0f766e] hover:bg-[#0d5f59] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span>Open {version.name}</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            Testing Guide
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">What to Test:</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• All interactive buttons and modals</li>
                <li>• Mobile responsiveness (resize browser)</li>
                <li>• Smooth scrolling and animations</li>
                <li>• Review carousel navigation</li>
                <li>• Order form functionality</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">SEO Features:</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• View source (Ctrl+U) to see full HTML</li>
                <li>• All content visible to search engines</li>
                <li>• Optimized meta tags for social sharing</li>
                <li>• Fast initial page load</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need to switch versions?
            </h3>
            <p className="text-gray-600">
              Simply return to this page to access both homepage versions anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
