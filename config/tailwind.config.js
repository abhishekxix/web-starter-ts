/** @type {import('tailwindcss').Config} */
console.log(process.cwd());

module.exports = {
	content: ['./**/*.html'],
	theme: {
		extend: {
			boxShadow: {
				'help-suggested-reading': '0px 1px 0px #E2E8F0',
				'card-light':
					'0px 2px 4px rgba(0, 0, 0, 0.1), 0px -0.5px 2px rgba(0, 0, 0, 0.1)',
				'plan-hero-section': 'inset 0px -1px 0px #E2E8F0',
				'plan-search-bar-input': '0px 0.5px 2px rgba(0, 0, 0, 0.1)',
				'plan-search-bar-no-matches': '0px 1px 0px #E2E8F0',
				'plan-search-bar-results':
					'0px 0px 2px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.08)',
				'trust-marker-banner-mobile':
					'0px -1px 4px rgba(0, 0, 0, 0.02), 0px -4px 12px rgba(0, 0, 0, 0.06)',
				'trust-marker-banner-mobile-additional-info':
					'inset 0px -1px 0px #E6E6E6',
				'mobile-bottom-sticky-widget':
					'0px -6px 12px rgba(0, 0, 0, 0.04), inset 0px 1px 0px rgba(0, 0, 0, 0.1)',
				'subscribe-email-input':
					'0px 0px 1.5px rgba(0, 0, 0, 0.5), 0px 1px 2px rgba(0, 0, 0, 0.1)',
				'subscribe-email-input--footer':
					'0px 0.5px 2px rgba(0, 0, 0, 0.1)',
				'subscribe-modal':
					'0px 0px 2px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.08)',
				'success-modal-app-link-boxes':
					'0px 2px 3px rgba(0, 0, 0, 0.07), 0px 0.5px 2px rgba(0, 0, 0, 0.1)',
				'footer-container': 'inset 0px 1px 0px #E6E6E6',
			},
		},
	},
	plugins: [],
};
