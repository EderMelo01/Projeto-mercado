using System;
using System.Data;
using System.IO;
using System.Text.Json.Serialization;
using ExcelDataReader;

public class Produto
{
    public int id;
    [JsonInclude]
    public string nome;
    [JsonInclude]
    public decimal preco;
    [JsonInclude]
    public string imagem;
    [JsonInclude]
    public int perecivel;
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
                            produto["preco"] = row[1].ToString() == "" || row[1].ToString == null? 0.00 : row[1]; 
                            produto["perecivel"] = false;
                            produtos.Add(produto);
                        }
                    }
                }
            }
        }
        return produtos; 
    }
}