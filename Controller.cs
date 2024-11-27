using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace PrimeiroProjeto
{
    public class Controller
    {
        Db db;
        public Controller(Db db){
            this.db= db;
        }
        public async Task<User> GetUserByName(string name){
            return db.GetUserByName(name);
        }
        public void Upgrade(string command)
        {
            db.Upgrade(command);
        }
    }
}