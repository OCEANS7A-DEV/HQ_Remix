
import LinkBaner from '../comp/Linkbanar';


export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <div><h2>本部在庫</h2></div>
        <div>
          <LinkBaner/>
        </div>
      </div>
    </div>
  );
}
