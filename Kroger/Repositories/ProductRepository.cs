using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kroger.Models;
using Npgsql;
using Dapper;

namespace Kroger.Repositories
{
    public class ProductRepository
    {
        string _connectionString = @"Username=jnnbhkztdilscf;Password=78568411ac46a3a2731110223e7ca164c19c34b94fb425d72b253be0fbd6513a;Host=ec2-174-129-253-47.compute-1.amazonaws.com;Database=d5be1shopark8h;Port=5432;SSL Mode=Require;Trust Server Certificate=True;";

        public IEnumerable<Product> GetAllProducts()
        {
            using (var db = new NpgsqlConnection(_connectionString))
            {
                var sql = @"with maxDate as (
                                SELECT 
                                    max(Capturedate) as max_date 
                                FROM daily_product_snapshot
                            )
                            SELECT 
                                dps.*
                            FROM daily_product_snapshot dps
                                JOIN maxDate mx on mx.max_date = dps.Capturedate
                            LIMIT 10";
                var product = db.Query<Product>(sql);
                return product;
            };
        }

        public Product GetSingleProductInformation(string productId)
        {
            using (var db = new NpgsqlConnection(_connectionString))
            {
                var sql = @"with maxDate as (
                                SELECT 
                                    max(Capturedate) as max_date 
                                FROM daily_product_snapshot
                            )
                            SELECT 
                                dps.*
                            FROM daily_product_snapshot dps
                                join maxDate mx on mx.max_date = dps.Capturedate
                            WHERE dps.Productid = @product";
                var param = new { product = productId };
                var product = db.QueryFirst<Product>(sql, param);
                return product;
            };
        }

        public float GetMaximumPriceByProduct(string productId)
        {
            using (var db = new NpgsqlConnection(_connectionString))
            {
                var sql = @"SELECT 
                                max(productRegularPrice)::float 
                            FROM daily_product_snapshot 
                            WHERE Productid = @product;";
                var param = new { product = productId };
                var product = db.QueryFirst<float>(sql, param);
                return product;
            };
        }

        public float GetMinimumPriceByProduct(string productId)
        {
            using (var db = new NpgsqlConnection(_connectionString))
            {
                var sql = @"SELECT 
                                coalesce(min(productPromoPrice), min(productRegularPrice))::float 
                            FROM daily_product_snapshot 
                            WHERE Productid = @product;";
                var param = new { product = productId };
                var product = db.QueryFirst<float>(sql, param);
                return product;
            };
        }
    }
}
