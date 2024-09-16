const mongoose = require("mongoose");

// cv Schema
const cvSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [1024, "Summary cannot exceed 1024 characters"],
    },
    templates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
      },
    ],
    mainInfos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MainInfo",
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Connction",
      },
    ],
    experiences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    educations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education",
      },
    ],
    honorAndaWards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HonorAndaWard",
      },
    ],
    hobbyAndInterests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HobbyAndInterest",
      },
    ],
    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],

    languages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    socialLinks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialLink",
      },
    ],

    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // }

    // updatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

// cv model
const Cv = mongoose.model("Cv", cvSchema);

async function generateUniqueCvCode() {
  const code = Math.random().toString(36).substring(2, 10);
  const existingCV = await Cv.findOne({ code });

  if (existingCV) {
    return generateUniqueCvCode();
  }

  return code;
}

// a unique code before saving the CV
cvSchema.pre("save", async function (next) {
  if (!this.code) {
    this.code = await generateUniqueCvCode();
  }
  next();
});

module.exports = Cv;
