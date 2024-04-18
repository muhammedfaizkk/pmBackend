const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;
const User = require('../models/userModel');
const addProject = require('../models/addProjectsmodel')
const expences = require('../models/addExpenses')
const income = require('../models/addIncome');
const prayer = require('../models/prayer');
const depts = require('../models/addDept');
const deptsopp = require('../models/addDeptsopp');

exports.Login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        // Find the user by their username
        const user = await User.findOne({ userName });

        // If user is not found, return 404 error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the provided password matches the user's password
        if (password !== user.password || userName !== user.userName) {
            // If passwords don't match or username is incorrect, return 401 error
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // If authentication is successful, create a token payload
        const tokenPayload = {
            id: user._id,
            userName: user.userName // Optionally include other non-sensitive user information
        };

        // Generate JWT token using the payload and secret key, with expiration time
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });

        // Set JWT token as a cookie and send a success response with user information
        res.status(200).cookie("token", token).json({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        // Handle any errors that occur during authentication
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


exports.addProjects = async (req, res, next) => {

    const { clientName, projectType, started, projectStatus, lastUpdated } = req.body

    try {
        const addProjects = addProject.create({
            clientName,
            projectType,
            started,
            projectStatus,
            lastUpdated
        })

        if (!addProjects) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Projects added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

exports.updateProjects = async (req, res, next) => {
    try {


        const { clientName, projectType, started, projectStatus, lastUpdated } = req.body;

        const updatedProject = await addProject.findByIdAndUpdate(
            req.params.id,
            { clientName, projectType, started, projectStatus, lastUpdated },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully updated project',
            updatedProject,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging

        // Handle specific errors (e.g., validation errors)
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error: ' + error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};



exports.getAllprojects = async (req, res, next) => {
    try {
        const projects = await addProject.find();
        if (projects.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No projects found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            projects
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,

        })
    }
};

exports.removeItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedTask = await addProject.findByIdAndDelete(id)
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Invaild crediantials"
            })
        }

        res.status(200).json({ message: 'Successfully removed task', success: true });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }


};
exports.Expences = async (req, res, next) => {
    const { title, category, amount, type } = req.body
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;


    try {
        const addExpenses = expences.create({
            title,
            currentDate: formattedDate,
            category,
            type,
            amount,

        })

        if (!addExpenses) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Expenses added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
exports.UpdateExpences = async (req, res, next) => {

    try {
        const { title, category, type, amount } = req.body;

        const updatedEx = await expences.findByIdAndUpdate(
            req.params.id,
            { title, category, type, amount },
            { new: true }
        );

        if (!updatedEx) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully updated expense',
            updatedEx,
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error: ' + error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getAllexpenses = async (req, res, next) => {
    try {
        const expenses = await expences.find();

        if (expenses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No projects found"
            });
        }
        res.status(200).json({
            success: true,
            message: "expenses fetched successfully",
            expenses
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,

        })
    }
};

exports.removeExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedExpense = await expences.findByIdAndDelete(id);
       
        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully removed expense',
            deletedExpense: deletedExpense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};







exports.Income = async (req, res, next) => {
    const { title, category, amount, type } = req.body
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;


    try {
        const addIncome = income.create({
            title,
            currentDate: formattedDate,
            category,
            type,
            amount,

        })

        if (!addIncome) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Expenses added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
exports.getIncomes = async (req, res, next) => {
    try {
        const incomes = await income.find();
        if (incomes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No projects found"
            });
        }
        res.status(200).json({
            success: true,
            message: "incomes fetched successfully",
            incomes
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,

        })
    }
};
exports.UpdateIncome = async (req, res, next) => {

    try {
        const { title, category, type, amount } = req.body;

        const updatedInc = await income.findByIdAndUpdate(
            req.params.id,
            { title, category, type, amount },
            { new: true }
        );

        if (!updatedInc) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully updated expense',
            updatedInc,
        });
    } catch (error) {

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error: ' + error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.Incomeremove = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedIncome = await income.findByIdAndDelete(id);
      
        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully removed expense',
            deletedExpense: deletedExpense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

exports.Prayers = async (req, res, next) => {
    const { Fajr, Dhuhr, Asr, Maghrib, Isha } = req.body
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;


    try {
        const addPrayers = prayer.create({
            currentDate: formattedDate,
            Fajr,
            Dhuhr,
            Asr,
            Maghrib,
            Isha

        })



        if (!addPrayers) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Prayers added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
exports.getAllprayers = async (req, res, next) => {
    try {
        const prayers = await prayer.find();
        if (prayers.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No projects found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Prayers fetched successfully",
            prayers,
        });
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};


exports.prayerDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedPrayer = await prayer.findByIdAndDelete(id);
        if (!deletedPrayer) {
            return res.status(404).json({
                success: false,
                message: "Prayer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully removed prayer',
            deletedPrayer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};


exports.Adddepts = async (req, res, next) => {
    const { name, amount } = req.body
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;


    try {
        const addDepts = depts.create({
            currentDate: formattedDate,
            name,
            amount,
        })



        if (!addDepts) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Prayers added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.Adddeptsopp = async (req, res, next) => {
    const { name, amount } = req.body
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;


    try {
        const addDepts = deptsopp.create({
            currentDate: formattedDate,
            name,
            amount,
        })



        if (!addDepts) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Prayers added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getDepts = async (req, res, next) => {
    try {
        const dept = await depts.find();
        if (depts.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No depts found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Depts fetched successfully",
            dept,
        });
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getDeptsopp = async (req, res, next) => {
    try {
        const dept = await deptsopp.find();
        if (deptsopp.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No depts found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Depts fetched successfully",
            dept,
        });
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deptsDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedDepts = await depts.findByIdAndDelete(id);
        if (!deletedDepts) {
            return res.status(404).json({
                success: false,
                message: "Prayer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully removed prayer',
            deletedDepts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};


exports.deptsoppDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedDepts = await deptsopp.findByIdAndDelete(id);
        if (!deletedDepts) {
            return res.status(404).json({
                success: false,
                message: "Prayer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully removed prayer',
            deletedDepts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

