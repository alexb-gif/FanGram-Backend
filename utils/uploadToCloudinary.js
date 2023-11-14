const cloudinary = require("cloudinary")

module.exports.uploadVideosToCloudinary = async (celebrityVideos) => {
  const CelebrityVideosLinks = [];

  for (let i = 0; i < celebrityVideos.length; i++) {
    try {
      const result = await cloudinary.v2.uploader.upload(celebrityVideos[i], {
        folder: "celebrityVideos",
      });

      CelebrityVideosLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.error('Error uploading video to Cloudinary:', error);
    }
  }

  return CelebrityVideosLinks;
};