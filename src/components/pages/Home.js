import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark, markRead } from "../../store/slices/newsSlice";
import { ARTICLES, CATEGORIES } from "../../data/articles";
import { Bookmark, BookmarkCheck, Clock, Eye, TrendingUp, Flame } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function ArticleCard({ article, size="medium" }) {
  const dispatch = useDispatch();
  const dark = useSelector(s => s.ui.darkMode);
  const bookmarks = useSelector(s => s.news.bookmarks);
  const isBookmarked = bookmarks.includes(article.id);
  const cat = CATEGORIES.find(c=>c.slug===article.category);

  return (
    <div style={{background:dark?"#1e293b":"#fff",borderRadius:14,overflow:"hidden",border:`1px solid ${dark?"#334155":"#e2e8f0"}`,transition:"transform .15s,box-shadow .15s",cursor:"pointer",height:"100%"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=dark?"0 8px 24px rgba(0,0,0,.4)":"0 8px 24px rgba(0,0,0,.1)"}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
      <Link to={`/article/${article.id}`} onClick={()=>dispatch(markRead(article.id))} style={{display:"block",textDecoration:"none",color:"inherit",height:"100%"}}>
        <div style={{position:"relative",height:size==="large"?220:160}}>
          <img src={article.image} alt={article.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          {article.breaking && <span style={{position:"absolute",top:10,left:10,background:"#dc2626",color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:4,letterSpacing:.5}}>BREAKING</span>}
          <span style={{position:"absolute",bottom:10,left:10,background:cat?.color+"ee",color:"#fff",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{cat?.label}</span>
        </div>
        <div style={{padding:size==="large"?"18px":"12px 14px"}}>
          <h3 style={{margin:"0 0 8px",fontSize:size==="large"?17:15,fontWeight:700,lineHeight:1.4,color:dark?"#e2e8f0":"#1a202c"}} className="line-clamp-2">{article.title}</h3>
          {size !== "small" && <p style={{margin:"0 0 10px",fontSize:13,color:dark?"#94a3b8":"#64748b",lineHeight:1.6}} className="line-clamp-2">{article.excerpt}</p>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:dark?"#64748b":"#94a3b8"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <img src={article.authorImg} alt={article.author} style={{width:22,height:22,borderRadius:"50%"}}/>
              <span>{article.author}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{display:"flex",alignItems:"center",gap:3}}><Clock size={11}/>{article.readTime}m</span>
              <span style={{display:"flex",alignItems:"center",gap:3}}><Eye size={11}/>{(article.views/1000).toFixed(0)}k</span>
            </div>
          </div>
        </div>
      </Link>
      <button onClick={()=>dispatch(toggleBookmark(article.id))}
        style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,.4)",border:"none",borderRadius:6,padding:"5px",cursor:"pointer",color:"#fff",display:"flex",backdropFilter:"blur(4px)"}}>
        {isBookmarked ? <BookmarkCheck size={16} fill="#fff"/> : <Bookmark size={16}/>}
      </button>
    </div>
  );
}

export default function Home() {
  const dark = useSelector(s => s.ui.darkMode);
  const breaking = ARTICLES.filter(a=>a.breaking);
  const latest = ARTICLES.slice(0,6);
  const trending = [...ARTICLES].sort((a,b)=>b.views-a.views).slice(0,5);
  const [liveViews, setLiveViews] = useState(ARTICLES.map(a=>a.views));

  useEffect(()=>{
    const t = setInterval(()=>{
      setLiveViews(v=>v.map(n=>n+Math.floor(Math.random()*50)));
    }, 3000);
    return ()=>clearInterval(t);
  },[]);

  const chartData = {
    labels: ARTICLES.slice(0,6).map(a=>a.title.substring(0,20)+"..."),
    datasets: [{ data: liveViews.slice(0,6), backgroundColor: ["#dc2626","#8b5cf6","#f59e0b","#10b981","#ef4444","#ec4899"], borderRadius: 6 }]
  };
  const chartOpts = { responsive:true, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false},ticks:{font:{size:10},color:dark?"#64748b":"#94a3b8"}},y:{grid:{color:dark?"#1e293b":"#f1f5f9"},ticks:{callback:v=>(v/1000).toFixed(0)+"k",color:dark?"#64748b":"#94a3b8"}}} };

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24,marginBottom:32}}>
        <div style={{position:"relative"}}>
          <h2 style={{margin:"0 0 16px",fontSize:18,fontWeight:700,display:"flex",alignItems:"center",gap:8}}><Flame size={20} color="#dc2626"/> Break Test News</h2>
          <div style={{display:"grid",gap:16}}>
            {breaking.map((a,i)=><div key={a.id} style={{position:"relative"}}><ArticleCard article={a} size={i===0?"large":"medium"}/></div>)}
          </div>
        </div>
        <div>
          <h2 style={{margin:"0 0 16px",fontSize:18,fontWeight:700,display:"flex",alignItems:"center",gap:8}}><TrendingUp size={20} color="#f59e0b"/> Trending Now</h2>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {trending.map((a,i)=>(
              <Link key={a.id} to={`/article/${a.id}`} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"12px",background:dark?"#1e293b":"#fff",borderRadius:10,border:`1px solid ${dark?"#334155":"#e2e8f0"}`,textDecoration:"none",color:"inherit"}}>
                <span style={{fontSize:24,fontWeight:800,color:"#f1f5f9",minWidth:28,lineHeight:1}}>{i+1}</span>
                <div style={{flex:1}}>
                  <p style={{margin:"0 0 4px",fontSize:13,fontWeight:600,lineHeight:1.4,color:dark?"#e2e8f0":"#1a202c"}} className="line-clamp-2">{a.title}</p>
                  <span style={{fontSize:11,color:"#94a3b8"}}>{(a.views/1000).toFixed(0)}k views &bull; {a.readTime}m read</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{background:dark?"#1e293b":"#fff",borderRadius:14,padding:16,border:`1px solid ${dark?"#334155":"#e2e8f0"}`,marginTop:20}}>
            <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:600}}>Live Article Views</h3>
            <Bar data={chartData} options={chartOpts} height={140}/>
          </div>
        </div>
      </div>

      <h2 style={{margin:"0 0 16px",fontSize:18,fontWeight:700}}>Latest Stories</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
        {latest.map(a=><div key={a.id} style={{position:"relative"}}><ArticleCard article={a} size="medium"/></div>)}
      </div>
    </div>
  );
}