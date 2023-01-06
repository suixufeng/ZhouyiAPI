using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2;
using WebApplication2.Data;

namespace WebApplication2.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class jieguaController : ControllerBase
    {
        private readonly WebApplication2Context _context;

        public jieguaController(WebApplication2Context context)
        {
            _context = context;
        }

        // GET: api/jiegua
        [HttpGet]
        public async Task<ActionResult<IEnumerable<jiegua>>> Getjiegua()
        {
            return await _context.jiegua.ToListAsync();
        }

        // GET: api/jiegua/5
        [HttpGet("{id}")]
        public async Task<ActionResult<jiegua>> Getjiegua(string id)
        {
            var jiegua = await _context.jiegua.FindAsync(id);

            if (jiegua == null)
            {
                return NotFound();
            }

            return jiegua;

         
        }

        //[HttpGet("{id}/{yaoname}")]
        //public string Getjiegua(string id, string yaoname)
        //{
        //    var jieguas = _context.jiegua.FirstOrDefault(b => b.卦号== id);
        //    foreach(jiegua b in jieguas)
        //    {
               
        //    }

        //    return $"主键：{id},姓名：{yaoname}";
        //}
        // PUT: api/jiegua/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putjiegua(string id, jiegua jiegua)
        {
            if (id != jiegua.卦号)
            {
                return BadRequest();
            }

            _context.Entry(jiegua).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!jieguaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/jiegua
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<jiegua>> Postjiegua(jiegua jiegua)
        {
            _context.jiegua.Add(jiegua);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (jieguaExists(jiegua.卦号))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("Getjiegua", new { id = jiegua.卦号 }, jiegua);
        }

        // DELETE: api/jiegua/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletejiegua(string id)
        {
            var jiegua = await _context.jiegua.FindAsync(id);
            if (jiegua == null)
            {
                return NotFound();
            }

            _context.jiegua.Remove(jiegua);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool jieguaExists(string id)
        {
            return _context.jiegua.Any(e => e.卦号 == id);
        }
    }
}
