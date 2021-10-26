export function seedDatabase(firebase: any) {
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "1LXPeqqYI3UthAYtc08gYeGAuWz1",
        imageSrc: `lemon14454/${i}.jpg`,
        caption: `這是第 ${i} 篇貼文 !`,
        likes: [],
        comments: [],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
