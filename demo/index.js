const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const md5 = require('md5');

//  Request uchun ishlatilish qonunlar
router.get('/api/1/:id', (req, res) => {
    const { name, age } = req.body
    const result = {
        "Havfsizlikni bilish": req.secure,
        "Cookieni aniqlash": req.cookies,
        "Router yolini aniqlash": req.route,
        "Hostnameni aniqlash": req.hostname,
        "Asosiy urlni  aniqlash": req.baseUrl,
        "To'liq apini aniqlash": req.originalUrl,
        "Body da yozilgan narsani aniqlash": {
            name,
            age
        },
        "Ip manzilni aniqlash": req.ip,
        "Ips manzilni aniqlash": req.ips,
        "Params ni aniqlash": req.params.id,
    }
    res.json(result)
})
/*
1.Cookie bilan ishlash
2.npm install cookie
2.npm install md5
*/
router.get('/api/2', (req, res) => {
    // Foydalanuchining malumoti
    const userData = {
        name: "Shahriyor",
        surname: "Isomiddinov",
        age: 23
    }
    // Malumotni hashlash
    const hashedData = md5(userData)
    const cookie_name = "Name" // Cookiening yo'li
    // Cookie ga yozish
    res.setHeader('Set-Cookie', cookie.serialize(cookie_name, hashedData, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
        sameSite: "strict",
        secure: false // agar true bolsa cookie yozilmaydi, aks holda yoziladi
    }));
    // Malumot yozish
    const result = {
        "Cookie": req.cookies,
        "Secure": req.secure
    }
    res.json(result)
})

// Response metodlari bilan bogliq holatlar
router.get('/api/3', (req, res) => {
    const userData = {
        name: "Shahriyor",
        surname: "Isomiddinov",
        age: 23
    }
    const token = md5(userData)
    res
        .status(201)
        .cookie('name', 'Bearer ' + token, {
            expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
            secure: true,
            sameSite: "strict",
            httpOnly: true,
        })
        .json("Cookie is created")
})
// Response metodlari bilan bogliq holatlar
router.get('/api/4', (req, res) => {
    res.clearCookie('name')
    res.json("Cookie is deleted")
})
// Umumiy pagelarni topilmasa
router.get("*", function (req, res) {
    res.json("page is not defined")
})

module.exports = router