using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using OpenGameListWebApp.Data;
using OpenGameListWebApp.Data.Items;
using OpenGameListWebApp.ViewModels;

namespace OpenGameListWebApp.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private int DefaultNumberOfItems => 5;
        private int MaxNumberOfItems => 100;
        private readonly ApplicationDbContext _dbContext;


        public ItemsController(ApplicationDbContext context)
        {
            _dbContext = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return NotFound(new { Error = "not found" });
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _dbContext.Items.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);

            return NotFound(new { Error = $"Item ID {id} has not been found"});
        }


        [Authorize]
        [HttpPost]
        public IActionResult Add([FromBody]ItemViewModel ivm)
        {
            if (ivm == null) return new StatusCodeResult(500);
            var item = TinyMapper.Map<Item>(ivm);
            item.CreatedDate = item.LastModifiedDate = DateTime.Now;
            item.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _dbContext.Items.Add(item);
            _dbContext.SaveChanges();

            return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
        }


        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]ItemViewModel ivm)
        {
            if (ivm == null) return NotFound(new {Error = $"Item ID {id} has not been found"});
            var item = _dbContext.Items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound(new {Error = $"Item ID {id} has not been found"});

            item.UserId = ivm.UserId;
            item.Description = ivm.Description;
            item.Flags = ivm.Flags;
            item.Notes = ivm.Notes;
            item.Text = ivm.Text;
            item.Title = ivm.Title;
            item.Type = ivm.Type;
            item.LastModifiedDate = DateTime.Now;
            _dbContext.SaveChanges();

            return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
        }


        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _dbContext.Items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound(new {Error = $"Item ID {id} has not been found"});
            _dbContext.Items.Remove(item);
            _dbContext.SaveChanges();

            return new OkResult();
        }


        [HttpGet("GetLatest/{num}")]
        IActionResult GetLatest(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = _dbContext.Items.OrderByDescending(i => i.CreatedDate).Take(n).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
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
            var items = _dbContext.Items.OrderByDescending(i => i.ViewCount).Take(n).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
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
            var items = _dbContext.Items.OrderBy(i => Guid.NewGuid()).Take(n).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }


        private List<ItemViewModel> ToItemViewModelList(IEnumerable<Item> items)
        {
            return items.Select(TinyMapper.Map<ItemViewModel>).ToList();
        }

        private JsonSerializerSettings DefaultJsonSettings => new JsonSerializerSettings
        {
            Formatting = Formatting.Indented
        };
    }
}
