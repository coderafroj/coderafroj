import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, keywords, type = 'website', date, author, schema }) => {
    const siteTitle = 'Coderafroj';
    const defaultDescription = 'Official protocol of Coderafroj. Advanced Computer Science notes, Full-Stack development tutorials, and Digital Architecture resources.';
    const defaultKeywords = 'Coderafroj, Programming, Computer Science, C Language, Operating Systems, Web Development, Tutorials';
    const siteUrl = 'https://coderafroj.vercel.app';
    const defaultImage = `${siteUrl}/logo.png`;

    const seoUrl = url ? `${siteUrl}${url}` : siteUrl;
    const seoDescription = description || defaultDescription;
    const seoTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const seoImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

    // Structured Data (JSON-LD)
    const structuredData = schema || {
        "@context": "https://schema.org",
        "@type": type === 'article' ? "Article" : "WebSite",
        "url": seoUrl,
        "name": seoTitle,
        "description": seoDescription,
        "image": seoImage,
        ...(type === 'article' && {
            "headline": title,
            "datePublished": date,
            "author": {
                "@type": "Person",
                "name": author || "Coderafroj"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Coderafroj",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${siteUrl}/logo.png`
                }
            }
        })
    };

    return (
        <Helmet>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={seoUrl} />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seoUrl} />
            <meta property="twitter:title" content={seoTitle} />
            <meta property="twitter:description" content={seoDescription} />
            <meta property="twitter:image" content={seoImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
