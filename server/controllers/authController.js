// authController.js
module.exports = {
    register: async (req, res) => {
      const { name, email, password } = req.body;
  
      try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already registered' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        const newUser = await User.create({ name, email, password: hashedPassword });
  
        // Exclude password from the response
        const { password: omit, ...userWithoutPassword } = newUser.toObject();
  
        res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    // Add other authentication controller methods as needed
  };
  