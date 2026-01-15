import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, keywords }) => {
    const siteTitle = 'Coderafroj';
    const defaultDescription = 'Official protocol of Coderafroj. Advanced Computer Science notes, Full-Stack development tutorials, and Digital Architecture resources.';
    const defaultKeywords = 'Coderafroj, Programming, Computer Science, C Language, Operating Systems, Web Development, Tutorials';
    const siteUrl = 'https://coderafroj.vercel.app';
    const defaultImage = `${siteUrl}/logo.png`; // Assuming logo is also in public

    const seoUrl = url || siteUrl;
    const seoDescription = description || defaultDescription;
    const seoTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={seoUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seoUrl} />
            <meta property="twitter:title" content={seoTitle} />
            <meta property="twitter:description" content={seoDescription} />
            <meta property="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
