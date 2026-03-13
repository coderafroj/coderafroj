export default {
    name: 'note',
    title: 'Note',
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
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
                {
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Code Block',
                    fields: [
                        { name: 'language', type: 'string', title: 'Language' },
                        { name: 'code', type: 'text', title: 'Code' }
                    ]
                }
            ],
        },
    ],
}
