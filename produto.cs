using System;
using System.Data;
using System.IO;
using ExcelDataReader;

public class Produto
{
    private int id;
    private string nome;
    private double preco;
    private string imagem;
    private bool perecivel;
    public Produto()
    {

    }
    public static List<Dictionary<string, dynamic>> importacao(string caminho)
    {
        List<Dictionary<string, dynamic>> produtos = new List<Dictionary<string, dynamic>>();

        if (!File.Exists(caminho))
        {
            Console.WriteLine("Arquivo não encontrado.");
        }
        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        using (var stream = File.Open("produtos.xlsx", FileMode.Open, FileAccess.Read))
        {
        
            using (var reader = ExcelReaderFactory.CreateReader(stream))
            {
            
                var result = reader.AsDataSet();

      
                foreach (DataTable table in result.Tables)
                {
                    foreach (DataRow row in table.Rows)
                    {
                        if(row[0].ToString() != "Produto" && row[1].ToString() != "Venda UN"){
                            Dictionary<string, dynamic> produto = new Dictionary<string, dynamic>();
                            produto["nome"] = row[0].ToString();
                            produto["preco"] = Convert.ToString(row[1])== ""? 0.00 :  Convert.ToDouble(row[1]);
                            produto["imagem"] = "";
                            produto["perecivel"] = "FALSE";
                            produtos.Add(produto);
                        }
                    }
                }
            }
        }
        return produtos; 
    }
}