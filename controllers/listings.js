const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let data = await Listing.find({});

  res.render("listing/index.ejs", { data });

  // .catch((err) => console.log(err));
};

module.exports.renderNewForm = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  let data = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  // populate is a Mongoose feature that automatically replaces referenced ObjectId values with the actual documents they point to.
  if (!data) {
    req.flash("error", "Listing you are trying to access was no longer exist");
    return res.redirect("/listings");
  }
  res.render("listing/show.ejs", { data });
};

module.exports.createListing = async (req, res) => {
  let { title, description, image, price, location, country } = req.body;

  const newListing = new Listing({
    title: title.trim(),
    description: description ? description.trim() : "",
    image: image ? image.trim() : "",
    price: Number(price),
    location: location ? location.trim() : "",
    country: country ? country.trim() : "",
    owner: req.user._id,
  });
  console.log("\n \n \n USER ID:");
  console.log(req.user._id);
  let data = await newListing.save();
  req.flash("success", "new Listing added successfully");
  res.redirect("/listings");
  console.log(data);
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  await Listing.findById(id).then((data) => {
    res.render("listing/edit.ejs", { data });
  });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let { title, description, image, price, location, country } = req.body;

  let data = await Listing.findByIdAndUpdate(id, {
    $set: {
      title: title.trim(),
      description: description ? description.trim() : "",
      image: image ? image.trim() : "",
      price: Number(price),
      location: location ? location.trim() : "",
      country: country ? country.trim() : "",
    },
  });
  req.flash("success", "Listing Updated successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id).then((data) => {
    console.log(data);
    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings");
  });
};
