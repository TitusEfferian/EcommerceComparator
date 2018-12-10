import express from 'express'
import bukalapak from './bukalapak/fetchBukalapak'
import bliblicom from './bliblicom/fetchDataBliBliCom'
import tokopedia from './tokopedia/fetchDataTokopedia'

const app = express()

app.get('/api/v1/ecommerce/:product', async function (req, res, next) {
    const data = []
    try{
        const search = await req.params.product
        const resultTokopedia = await tokopedia(search)
        const resultBukalapak = await bukalapak(search)
        const resultBliBliCom = await bliblicom(search)
        data.push(...resultTokopedia,...resultBukalapak,...resultBliBliCom)
        /*data.sort((a, b) => parseInt(a.price) - parseInt(b.price))*/
        res.send({
            success:true,
            data: data.sort((a, b) => parseInt(a.price) - parseInt(b.price))
        })
    }
    catch(e){
        console.log(e)
    }
});

app.get('/api/v1',(req,res)=>{
    res.send({success:true})
})

app.listen(3000,()=>{console.log('run on 3000')})