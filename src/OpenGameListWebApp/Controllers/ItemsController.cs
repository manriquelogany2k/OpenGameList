using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OpenGameListWebApp.ViewModels;

namespace OpenGameListWebApp.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private int DefaultNumberOfItems => 5;
        private int MaxNumberOfItems => 100;


        [HttpGet]
        public IActionResult Get()
        {
            return NotFound(new { Error = "not found" });
        }


        [HttpGet("{id}")]

        public IActionResult Get(int id)
        {
            return new JsonResult(GetSampleItems().FirstOrDefault(i => i.Id == id), DefaultJsonSettings);
        }


        [HttpGet("GetLatest/{num}")]
        IActionResult GetLatest(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = GetSampleItems().OrderByDescending(i => i.CreatedDate).Take(n);
            return new JsonResult(items, DefaultJsonSettings);
        }


        [HttpGet("GetLatest")]
        public IActionResult GetLatest()
        {
            return GetLatest(DefaultNumberOfItems);
        }


        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed()
        {
            return GetMostViewed(DefaultNumberOfItems);
        }


        [HttpGet("GetMostViewed/{n}")]
        public IActionResult GetMostViewed(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = GetSampleItems().OrderByDescending(i => i.ViewCount).Take(n);
            return new JsonResult(items, DefaultJsonSettings);
        }


        [HttpGet("GetRandom")]
        public IActionResult GetRandom()
        {
            return GetRandom(DefaultNumberOfItems);
        }


        [HttpGet("GetRandom/{n}")]
        public IActionResult GetRandom(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = GetSampleItems().OrderBy(i => Guid.NewGuid()).Take(n);
            return new JsonResult(items, DefaultJsonSettings);
        }



        private List<ItemViewModel> GetSampleItems(int num = 999)
        {
            var lst = new List<ItemViewModel>();
            var date = new DateTime(2015, 12, 31).AddDays(-num);
            for (var id = 1; id <= num; id++)
            {
                lst.Add(new ItemViewModel
                {
                    Id = id,
                    Title = $"Item {id} Title",
                    Description = $"This is a sample description for item {id}: Lorem ipsum dolor sit amet.",
                    CreatedDate = date.AddDays(id),
                    LastModifiedDate = date.AddDays(id),
                    ViewCount = num - id
                });
            }
            return lst;
        }


        private JsonSerializerSettings DefaultJsonSettings => new JsonSerializerSettings
        {
            Formatting = Formatting.Indented
        };
    }
}
