import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark, markRead } from "../../store/slices/newsSlice";
import { ARTICLES, CATEGORIES } from "../../data/articles";
import { useEffect } from "react";
import { ArrowLeft, Bookmark, BookmarkCheck, Clock, Eye, Share2, Twitter, Facebook } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ArticlePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dark = useSelector(s=>s.ui.darkMode);
  const bookmarks = useSelector(s=>s.news.bookmarks);
  const article = ARTICLES.find(a=>a.id===id);
  const isBookmarked = bookmarks.includes(id);
  const related = ARTICLES.filter(a=>a.category===article?.category && a.id!==id).slice(0,3);

  useEffect(()=>{ if(article) dispatch(markRead(id)); },[id]);

  if(!article) return <div style={{padding:40,textAlign:"center"}}>Article not found. <Link to="/" style={{color:"#dc2626"}}>Go home</Link></div>;
  const cat = CATEGORIES.find(c=>c.slug===article.category);

  const fullText = `${article.excerpt}

The implications of this development extend far beyond the immediate news cycle. Experts across multiple fields have weighed in, with many calling it one of the most significant events of the decade.

"We've been anticipating something like this for years," said Dr. Alexandra Chen, a leading researcher in the field. "The data we're seeing now confirms what many of us suspected, and the consequences will be felt for generations."

The response from global institutions has been swift. Multiple organizations have already convened emergency sessions to address the situation, and preliminary frameworks for international cooperation are being drafted.

Public reaction has been mixed, with some welcoming the news as a long-overdue development while others express concern about the pace of change and the potential for unintended consequences.

Analysts predict this story will continue to develop over the coming weeks and months, with additional details emerging as investigations and studies conclude. Our team will continue to provide updates as the situation evolves.

The broader context of this story sits against a backdrop of increasing global interconnectedness, where local events rapidly gain international significance. In such an environment, accurate, nuanced reporting becomes more critical than ever.`;

  return (
    <div style={{maxWidth:840,margin:"0 auto"}}>
      <div style={{marginBottom:20}}>
        <Link to="/" style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:14,color:dark?"#94a3b8":"#64748b",marginBottom:12}}>
          <ArrowLeft size={16}/>Back to News
        </Link>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <span style={{background:cat?.color,color:"#fff",fontSize:12,fontWeight:600,padding:"4px 12px",borderRadius:20}}>{cat?.label}</span>
          {article.breaking && <span style={{background:"#dc2626",color:"#fff",fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,letterSpacing:.5}}>BREAKING</span>}
        </div>
        <h1 style={{margin:"0 0 16px",fontSize:32,fontWeight:800,lineHeight:1.25,color:dark?"#e2e8f0":"#1a202c"}}>{article.title}</h1>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src={article.authorImg} alt={article.author} style={{width:40,height:40,borderRadius:"50%"}}/>
            <div>
              <p style={{margin:0,fontWeight:600,fontSize:14,color:dark?"#e2e8f0":"#1a202c"}}>{article.author}</p>
              <p style={{margin:0,fontSize:12,color:"#94a3b8"}}>{formatDistanceToNow(new Date(article.publishedAt))} ago &bull; {article.readTime} min read</p>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>dispatch(toggleBookmark(id))} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${dark?"#334155":"#e2e8f0"}`,background:isBookmarked?"#dc2626":"transparent",color:isBookmarked?"#fff":dark?"#94a3b8":"#64748b",display:"flex",alignItems:"center",gap:6,fontSize:13,cursor:"pointer"}}>
              {isBookmarked?<BookmarkCheck size={15}/>:<Bookmark size={15}/>} {isBookmarked?"Saved":"Save"}
            </button>
            <button style={{padding:"8px",borderRadius:8,border:`1px solid ${dark?"#334155":"#e2e8f0"}`,background:"transparent",color:dark?"#94a3b8":"#64748b",cursor:"pointer",display:"flex"}}><Share2 size={15}/></button>
          </div>
        </div>
      </div>

      <img src={article.image} alt={article.title} style={{width:"100%",height:400,objectFit:"cover",borderRadius:16,marginBottom:28}}/>

      <div style={{fontSize:17,lineHeight:1.8,color:dark?"#cbd5e1":"#374151"}}>
        {fullText.split("\n\n").map((para,i)=>(
          <p key={i} style={{marginBottom:20,fontFamily:i===0?"Merriweather,serif":"Inter,sans-serif",fontSize:i===0?18:17,fontWeight:i===0?400:400}}>{para}</p>
        ))}
      </div>

      <div style={{display:"flex",gap:8,marginTop:24,marginBottom:32,flexWrap:"wrap"}}>
        {article.tags.map(t=><span key={t} style={{background:dark?"#1e293b":"#f1f5f9",color:dark?"#94a3b8":"#475569",padding:"6px 14px",borderRadius:20,fontSize:13}}>#{t}</span>)}
      </div>

      {related.length > 0 && (
        <div style={{borderTop:`1px solid ${dark?"#334155":"#e2e8f0"}`,paddingTop:28}}>
          <h3 style={{margin:"0 0 16px",fontSize:18,fontWeight:700}}>Related Stories</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {related.map(a=>(
              <Link key={a.id} to={`/article/${a.id}`} style={{textDecoration:"none",color:"inherit"}}>
                <div style={{borderRadius:10,overflow:"hidden",border:`1px solid ${dark?"#334155":"#e2e8f0"}`,background:dark?"#1e293b":"#fff"}}>
                  <img src={a.image} alt={a.title} style={{width:"100%",height:100,objectFit:"cover"}}/>
                  <div style={{padding:"10px 12px"}}><p style={{margin:0,fontSize:13,fontWeight:600,lineHeight:1.4,color:dark?"#e2e8f0":"#1a202c"}} className="line-clamp-2">{a.title}</p></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}