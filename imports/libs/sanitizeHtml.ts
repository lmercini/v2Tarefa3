const dangerousTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'base']);
const urlAttributes = new Set(['href', 'src', 'xlink:href', 'formaction']);
const safeUrlPattern = /^(https?:|mailto:|tel:|\/|#)/i;
const safeDataImagePattern = /^data:image\/(?:png|gif|jpe?g|webp|svg\+xml);base64,/i;

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

export const sanitizeHtml = (value: unknown): string => {
	const html = String(value ?? '');

	if (typeof document === 'undefined') {
		return escapeHtml(html);
	}

	const template = document.createElement('template');
	template.innerHTML = html;

	const sanitizeNode = (node: Element) => {
		const tagName = node.tagName.toLowerCase();

		if (dangerousTags.has(tagName)) {
			node.remove();
			return;
		}

		Array.from(node.attributes).forEach((attribute) => {
			const attributeName = attribute.name.toLowerCase();
			const attributeValue = attribute.value.trim();

			if (attributeName.startsWith('on') || attributeName === 'srcdoc' || attributeName === 'style') {
				node.removeAttribute(attribute.name);
				return;
			}

			if (
				urlAttributes.has(attributeName) &&
				!safeUrlPattern.test(attributeValue) &&
				!safeDataImagePattern.test(attributeValue)
			) {
				node.removeAttribute(attribute.name);
			}
		});

		Array.from(node.children).forEach((child) => sanitizeNode(child));
	};

	Array.from(template.content.children).forEach((child) => sanitizeNode(child));

	return template.innerHTML;
};
