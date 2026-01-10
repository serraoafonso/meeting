const validateCreateMeet = (req, res, next) => {
  const { title, description, maxNumber, dateCreated, dateEnd } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: "Title is required" });
  }
  
  if (title.length > 55) {
    return res.status(400).json({ error: "Title must be less than 55 characters" });
  }
  
  if (!description || description.trim().length === 0) {
    return res.status(400).json({ error: "Description is required" });
  }
  
  if (description.length > 255) {
    return res.status(400).json({ error: "Description must be less than 255 characters" });
  }
  
  if (!maxNumber || isNaN(maxNumber) || maxNumber < 1) {
    return res.status(400).json({ error: "Max number must be a positive number" });
  }
  
  if (maxNumber > 100) {
    return res.status(400).json({ error: "Max number cannot exceed 100" });
  }
  
  if (!dateCreated || isNaN(new Date(dateCreated).getTime())) {
    return res.status(400).json({ error: "Invalid creation date" });
  }
  
  if (!dateEnd || isNaN(new Date(dateEnd).getTime())) {
    return res.status(400).json({ error: "Invalid end date" });
  }
  
  if (new Date(dateEnd) <= new Date(dateCreated)) {
    return res.status(400).json({ error: "End date must be after creation date" });
  }
  
  next();
};

const validateEditMeet = (req, res, next) => {
  const { title, description, maxNumber } = req.body;
  
  if (title !== undefined) {
    if (title.trim().length === 0) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    if (title.length > 55) {
      return res.status(400).json({ error: "Title must be less than 55 characters" });
    }
  }
  
  if (description !== undefined) {
    if (description.trim().length === 0) {
      return res.status(400).json({ error: "Description cannot be empty" });
    }
    if (description.length > 255) {
      return res.status(400).json({ error: "Description must be less than 255 characters" });
    }
  }
  
  if (maxNumber !== undefined) {
    if (isNaN(maxNumber) || maxNumber < 1) {
      return res.status(400).json({ error: "Max number must be a positive number" });
    }
    if (maxNumber > 100) {
      return res.status(400).json({ error: "Max number cannot exceed 100" });
    }
  }
  
  next();
};

module.exports = {
  validateCreateMeet,
  validateEditMeet
};
