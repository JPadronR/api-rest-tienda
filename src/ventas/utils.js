const debug = require('debug')('app:excelGenerator');
const excelGenerator = (products, name, res) => {
    const xl = require('excel4node');    //Paquete para generar reportes excel

    products = products.map((product) => {
        let id = product._id.toString();

        delete product._id;
        return {
            id,
            ...product
        };
    });

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('inventario');

    for(let i = 1; i<=products.length; i++)
    {
        for(let j = 1; j<=Object.keys(products[0]).length; j++)
        {
            let headers = Object.keys(products[i-1])[j-1];

            if(i===1)
            {
                ws.cell(i, j).string(headers);
            } else
            {
                let data = Object.values(products[i-2])[j-1];
                if(typeof data === 'string')
                {
                    ws.cell(i, j).string(data);
                } else
                {
                    ws.cell(i, j).number(data);
                }
                if(i==products.length)
                {
                    let data = Object.values(products[i-1])[j-1];
                    if(typeof data === 'string')
                    {
                        ws.cell(i+1, j).string(data);
                    } else
                    {
                        ws.cell(i+1, j).number(data);
                    }
                }
            }
        }
    }

    wb.write(`${name}.xlsx`, res);
}


module.exports.ProductsUtils = {
    excelGenerator
}