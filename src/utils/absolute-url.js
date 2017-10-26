import { siteMetadata } from '../../gatsby-config';
export default function absoluteUrl(link = '') {
	if (link.indexOf('http') === 0) {
		return link;
	}
	return siteMetadata.hostname + (__PATH_PREFIX__ || '') + link;
}
