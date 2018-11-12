db.define_table('movies',
                Field('title'),
                Field('description', 'text'),
                Field('rating')
                )