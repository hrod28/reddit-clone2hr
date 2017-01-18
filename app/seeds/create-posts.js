
exports.seed = function(knex, Promise) {

  const text1 = [
    "Nature's first green is gold, her hardest hue to hold\n\nHer early leaf's a flower, but only so an hour.\nThen leaf subscribes to leaf, so eden sank to grief.\n\nThen dawn goes down to day,\n\nNothing gold can stay.",
  ].join("\n")

  const text2 = [
    "Who's woods these are I think I know, his house is in the village, though.",
  ].join("\n\n")

  const text3 = [
    "Two roads diverged in a yellow wood, and sorry I could not travel both....",
  ].join("\n\n")

  return knex('comments').del()
    .then(() => knex('posts').del())
    .then(function () {
      return Promise.all([
        createPost(
          'Nothing gold can stay',
          text1,
          'Ironic Irma',
          'https://images.pexels.com/photos/211050/pexels-photo-211050.jpeg?h=350&auto=compress',
          new Date(2004, 12, 17)
        ),
        createPost(
          'Stopping by the woods on a snowy evening',
          text2,
          'Emo Emma',
          'https://images.pexels.com/photos/1994/red-vintage-shoes-sport.jpg?h=350&auto=compress',
          new Date(2011, 11, 11)
        ),
        createPost(
          "It's all about me",
          text3,
          'Hipster Henry',
          'https://images.pexels.com/photos/4787/feet-hipster-longboard-skateboard.jpg?h=350&auto=compress',
          new Date(2008, 5, 12)
        ),
      ])
    })
    .then(function (postIds) {
      return Promise.all([
        knex('comments').insert({post_id: postIds[0], content: 'Firsties!'}),
        knex('comments').insert({post_id: postIds[0], content: 'I did it for the lulz'}),
        knex('comments').insert({post_id: postIds[2], content: 'This comment thread is so lonely'}),
      ])
    })

  function createPost(title, body, author, image_url, created_at) {
    return knex('posts')
      .insert({title, body, author, image_url, created_at})
      .returning('id')
      .then(ids => ids[0])
  }
};
