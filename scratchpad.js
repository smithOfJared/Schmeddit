// topic, user, post, vote
//
// describe("hasUpvotesFor(userId)",() => {
//   it("should returns true if the user has upvoted the post", (done) => {
//     Topic.create({
//       title: "Best dogs",
//       description: "Post about what dogs are the best"
//     })
//     .then((topic) => {
//       User.create({
//         email: "doggydogs@dogs.com",
//         password: "ilikedogs"
//       })
//       .then((user) => {
//         Post.create({
//           title: "Dogs for days",
//           body: "Bow wow yippie yay yippie yo",
//           userId: this.user.id
//         })
//         .then((post) => {
//           Vote.create({
//             value: 1,
//             postId: post.id,
//             userId: user.id
//           })
//           .then((vote) => {
//             expect(post.hasUpvotesFor(user.id)).toBe(true);
//             done();
//           })
//           .catch((err) => {
//             console.log(err);
//             done();
//           });
//         });
//       });
//     });
//   });
// });
//
//
// describe("hasDownvotesFor(userId)",() => {
//   it("should return true if the user has downvoted the post", (done) => {
//     Topic.create({
//       title: "Best cats",
//       description: "Post about what cats are the best"
//     })
//     .then((topic) => {
//       User.create({
//         email: "cattycats@cats.com",
//         password: "ilikecats"
//       })
//       .then((user) => {
//         Post.create({
//           title: "Cats for days",
//           body: "Meow wow yippie yay yippie yo",
//           userId: this.user.id
//         })
//         .then((post) => {
//           Vote.create({
//             value: -1,
//             postId: post.id,
//             userId: user.id
//           })
//           .then((vote) => {
//             expect(post.hasDownvotesFor(user.id)).toBe(true);
//             done();
//           })
//           .catch((err) => {
//             console.log(err);
//             done();
//           });
//         });
//       });
//     });
//   });
// });
//
//
//
// let arr = ["a", "b", "c", "d", "e", "a", "b", "c", "f", "g", "h", "h", "h", "e", "a"];
//
//
// function countPics(arr) {
//
//   arr.sort();
//
//   var current = null;
//   var cnt = 0;
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] != current) {
//       if (cnt > 0) {
//         document.write(current + ' comes --> ' + cnt + ' times<br>');
//       }
//       current = arr[i];
//       cnt = 1;
//     } else {
//       cnt++;
//     }
//   }
//   if (cnt > 0) {
//     document.write(current + ' comes --> ' + cnt + ' times');
//   }
//
// }
//
//
// console.log(countPics(arr));
