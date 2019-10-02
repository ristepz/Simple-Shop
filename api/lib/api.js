const DB = require('./db');
const crypto = require('crypto');
const JWT_SECRET = 'Akgopto!p34LL4rotpdvdsfmnFJF65##]pAcvn90fjfjf';

class Api {
    /**
     * Get all categories
     * @param {*} req 
     * @param {*} res 
     */
    static getCategories(req, res) {
        DB.all(`SELECT * FROM categories`, [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ success: true, data: rows });
            }
        });
    }

    /**
    *Add new category
    * @param {*} req 
    * @param {*} res 
    */
    static addCategory(req, res) {
        const token = req.body.token;
        if (!Api.validateToken(token)) {
            res.status(500).json({ success: false, data: 'Login session expired.' });
            return;
        }
        const title = req.body.title;
        DB.run(`
      INSERT INTO categories(title) VALUES (?)
  `, [title], (err) => {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }
            res.status(200).json({ success: true });
        });
    }

    /**
     * Get all products
     * @param {*} req 
     * @param {*} res 
     */
    static getAllProducts(req, res) {
        DB.all(`SELECT * FROM products`, [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ success: true, data: rows });
            }
        });
    }

    /**
     * Add new product
     * @param {*} req 
     * @param {*} res 
     */
    static addProduct(req, res) {
        const token = req.get('Token');
        if (!Api.validateToken(token)) {
            res.status(500).json({ success: false, data: 'Login session expired.' });
            return;
        }
        const title = req.body.title;
        const category = req.body.category;
        const price = req.body.price;
        const image = req.body.image;
        const description = req.body.description;
        DB.run(`
      INSERT INTO products(title, category, price, image, description) VALUES (?, ?, ?, ?, ?)
  `, [title, category, price, image, description], (err) => {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }
            res.status(200).json({ success: true });
        });
    }

    /**
    * Get product
    * @param {*} req 
    * @param {*} res 
    */
    static getProduct(req, res) {
        DB.all(`SELECT * FROM products WHERE id=? LIMIT 1`, [req.body.id], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ success: true, data: rows });
            }
        });
    }

    /**
     * Get products by category id
     * @param {*} req 
     * @param {*} res 
     */
    static filterProductsByCategory(req, res) {
        DB.all(`SELECT * FROM products WHERE category=?`, [req.params.category], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ success: true, data: rows });
            }
        });
    }

    /**
     * Filter products by price
     * @param {*} req 
     * @param {*} res 
     */
    static filterProductsByPrice(req, res) {
        const minPrice = req.params.minPrice;
        const maxPrice = req.params.maxPrice;

        if (!minPrice || !maxPrice) {
            res.status(200).json({ success: true, data: [] });
        }

        DB.all(`SELECT * FROM products GROUP BY price HAVING price >=? AND price <=?`, [minPrice, maxPrice], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ success: true, data: rows });
            }
        });
    }

    /**
    * Add new product
    * @param {*} req 
    * @param {*} res 
    */
    static addUser(req, res) {
        // const token = req.get('Token');
        // if (!Api.validateToken(token)) {
        //     res.status(500).json({ success: false, data: 'Login session expired.' });
        //     return;
        // }
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password = crypto.createHash('md5').update(req.body.password).digest("hex");
        const currency = req.body.currency;
        const role = req.body.role || 'user';
        DB.run(`INSERT INTO users(first_name, last_name, email, password, currency, role) VALUES (?, ?, ?, ?, ?, ?) `,
            [first_name, last_name, email, password, currency, role], (err) => {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }
                res.status(200).json({ success: true });
            });
    }

    /**
    * Get product
    * @param {*} req 
    * @param {*} res 
    */
    static getUser(req, res) {
        const token = req.get('Token');
        if (!Api.validateToken(token)) {
            res.status(500).json({ success: false, data: 'Login session expired.' });
            return;
        }
        DB.all(`SELECT * FROM users WHERE id=? LIMIT 1`, [req.params.id], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ success: true, data: rows });
            }
        });
    }

    /**
     * Login User
     * @param {*} req 
     * @param {*} res 
     */
    static loginUser(req, res) {
        const email = req.body.email;
        const password = crypto.createHash('md5').update(req.body.password).digest("hex");
        const role = req.body.role;
        let sql = 'SELECT * FROM users WHERE email=? AND password=?';
        let params = [email, password];
        if(role){
            sql += ' AND role=?';
            params.push(role);
        }
        DB.all(sql, params, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                if (!rows.length) {
                    res.status(500).json({ success: false, data: 'Invalid login details' });
                } else {
                    const tokenData = JSON.stringify({ email: email, password: password });
                    const encryptedToken = Api.generateToken(tokenData);
                    res.status(200).json({ success: true, data: encryptedToken });
                }
            }
        });
    }
    /**
     * Generate login token
     * @param {*} data 
     */
    static generateToken(data) {
        let cipher = crypto.createCipher('aes256', JWT_SECRET);
        const token = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
        return token
    }
    /**
     * Decrypt login token
     * @param {*} data 
     */
    static decryptToken(data) {
        const decipher = crypto.createDecipher('aes256', JWT_SECRET);
        const decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    }
    /**
     * Validate token
     * @param {*} token 
     */
    static validateToken(token = '') {
        if (!token) {
            return false;
        }
        try {
            const decryptedData = Api.decryptToken(token);
            const recreatedToken = Api.generateToken(decryptedData);
            return token === recreatedToken;
        } catch (err) {
            return false;
        }
    }


}

module.exports = Api;