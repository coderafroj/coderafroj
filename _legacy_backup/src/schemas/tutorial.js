export default {
    name: 'tutorial',
    title: 'Tutorial',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'chapters',
            title: 'Chapters',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'chapter',
                    fields: [
                        { name: 'title', type: 'string', title: 'Chapter Title' },
                        {
                            name: 'content',
                            type: 'array',
                            title: 'Content',
                            of: [
                                { type: 'block' },
                                {
                                    type: 'image',
                                    options: { hotspot: true }
                                },
                                {
                                    type: 'object',
                                    name: 'codeBlock',
                                    title: 'Code Block',
                                    fields: [
                                        { name: 'language', type: 'string', title: 'Language' },
                                        { name: 'code', type: 'text', title: 'Code' },
                                        { name: 'filename', type: 'string', title: 'Filename' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
    ],
}
