import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ARTICLES } from "../../data/articles";
import { Search } from "lucide-react";
export default function SearchPage() {
  const { searchQuery } = useSelector(s=>s.ui);
  const dark = useSelector(s=>s.ui.darkMode);
  const results = ARTICLES.filter(a=>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tags.some(t=>t.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <div>
      <h1 style={{margin:"0 0 6px",fontSize:24,fontWeight:800}}>Search Results</h1>
      <p style={{margin:"0 0 24px",color:"#64748b",fontSize:14}}>{results.length} results for "{searchQuery}"</p>
      {results.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 0"}}><Search size={48} style={{color:"#e2e8f0",marginBottom:16}}/><p style={{color:"#64748b"}}>No results found. Try different keywords.</p></div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {results.map(a=>(
            <Link key={a.id} to={`/article/${a.id}`} style={{display:"flex",gap:16,background:dark?"#1e293b":"#fff",borderRadius:12,overflow:"hidden",border:`1px solid ${dark?"#334155":"#e2e8f0"}`,textDecoration:"none",color:"inherit"}}>
              <img src={a.image} alt={a.title} style={{width:120,height:100,objectFit:"cover",flexShrink:0}}/>
              <div style={{padding:"12px 0",flex:1}}>
                <span style={{fontSize:11,color:"#94a3b8",textTransform:"uppercase",letterSpacing:.5}}>{a.category}</span>
                <h3 style={{margin:"4px 0 6px",fontSize:15,fontWeight:700,color:dark?"#e2e8f0":"#1a202c"}}>{a.title}</h3>
                <p style={{margin:0,fontSize:13,color:"#64748b"}} className="line-clamp-1">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}