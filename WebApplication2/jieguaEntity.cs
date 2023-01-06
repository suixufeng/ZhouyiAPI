using System.ComponentModel.DataAnnotations;

namespace WebApplication2
{
    public class jiegua
    {
        
            [Key]
            public string? 卦号 { get; set; }
            /// <summary>
            /// 卦序
            /// </summary>
            public string? 卦序 { get; set; }
            /// <summary>
            /// 卦辞
            /// </summary>
            public string? 卦辞 { get; set; }
            public string? 诗曰 { get; set; }
            public string? 六爻 { get; set; }
            public string? 五爻 { get; set; }
           public string? 四爻 { get; set; }
            public string? 三爻 { get; set; }
            public string? 二爻 { get; set; }
            public string? 一爻 { get; set; }
            public string? 运势 { get; set; }
            public string? 求名 { get; set; }
            public string? 外出 { get; set; }
            public string? 婚恋 { get; set; }
            public string? 疾病 { get; set; }
            public string? 诉讼 { get; set; }
            public string? 失物 { get; set; }
            public string? 用九用六 { get; set; }
        }
    
}
