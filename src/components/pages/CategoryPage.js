import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark, markRead } from "../../store/slices/newsSlice";
import { ARTICLES, CATEGORIES } from "../../data/articles";
import { Clock, Eye, Bookmark, BookmarkCheck } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const dark = useSelector(s=>s.ui.darkMode);
  const bookmarks = useSelector(s=>s.news.bookmarks);
  const cat = CATEGORIES.find(c=>c.slug===slug);
  const articles = ARTICLES.filter(a=>a.category===slug);

  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{display:"inline-block",background:cat?.color,color:"#fff",padding:"6px 18px",borderRadius:20,fontSize:14,fontWeight:700,marginBottom:10}}>{cat?.label}</div>
        <h1 style={{margin:"0 0 6px",fontSize:28,fontWeight:800}}>{cat?.label} News</h1>
        <p style={{margin:0,color:"#64748b",fontSize:14}}>{articles.length} articles</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
        {articles.map(a=>(
          <div key={a.id} style={{background:dark?"#1e293b":"#fff",borderRadius:14,overflow:"hidden",border:`1px solid ${dark?"#334155":"#e2e8f0"}`,position:"relative"}}>
            <Link to={`/article/${a.id}`} onClick={()=>dispatch(markRead(a.id))} style={{textDecoration:"none",color:"inherit",display:"block"}}>
              <img src={a.image} alt={a.title} style={{width:"100%",height:160,objectFit:"cover"}}/>
              <div style={{padding:"14px 16px"}}>
                <h3 style={{margin:"0 0 8px",fontSize:15,fontWeight:700,lineHeight:1.4,color:dark?"#e2e8f0":"#1a202c"}}>{a.title}</h3>
                <p style={{margin:"0 0 12px",fontSize:13,color:dark?"#94a3b8":"#64748b",lineHeight:1.5}} className="line-clamp-2">{a.excerpt}</p>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#94a3b8"}}>
                  <span>{a.author}</span>
                  <span style={{display:"flex",gap:10,alignItems:"center"}}>
                    <span style={{display:"flex",alignItems:"center",gap:3}}><Clock size={11}/>{a.readTime}m</span>
                    <span style={{display:"flex",alignItems:"center",gap:3}}><Eye size={11}/>{(a.views/1000).toFixed(0)}k</span>
                  </span>
                </div>
              </div>
            </Link>
            <button onClick={()=>dispatch(toggleBookmark(a.id))} style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,.5)",border:"none",borderRadius:6,padding:5,cursor:"pointer",color:"#fff",display:"flex"}}>
              {bookmarks.includes(a.id)?<BookmarkCheck size={15} fill="#fff"/>:<Bookmark size={15}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}