import AskList from "../component/AskList";
import AskDetails from "../pages/ask/[id]"
import renderer from 'react-test-renderer';

// TODO: Passing undefined value to component should have an output message 'No Data'
describe("Check we get all data from ask", () => {
    test("Passing undefined value to component should have an output message 'No Data' ",  () => {
        let o = [];
        const d =  AskList({o})
        
        const p = d.props;
        expect(p.children).toBe('No Data')
    });
})
describe("Check if ask details component is rendering correctly", () => {
    test('Render correctly', () => {
        let d = {
            "by" : "supermatou",
            "descendants" : 4,
            "id" : 28387166,
            "kids" : [ 28387760, 28387236 ],
            "score" : 3,
            "text" : "Ask HN: Anyone using f2fs in real-life scenarios?<p>I&#x27;ve test-run f2fs (https:&#x2F;&#x2F;en.wikipedia.org&#x2F;wiki&#x2F;F2FS) on several laptops and various devices booting from external USB&#x2F;MMC devices in the past month. The subjective perception of the change in performance (from standard ext4) is evident. I was thinking very seriously about changing all my non-HDD-based devices to f2fs when I stumbled upon this:<p>https:&#x2F;&#x2F;www.usenix.org&#x2F;system&#x2F;files&#x2F;atc19-jaffer.pdf<p>Basicaly, it says that f2f2s doesn&#x27;t do as much checking for hardware errors as ext4 and tends to fail silently when there&#x27;s a problem with the physical medium. This worries me and makes me want to stop using it - but the paper in question is more than a couple of years old and f2fs has continued to evolve, patches have been submitted to the Linux kernel and so on.<p>Anyone using f2fs care to share his&#x2F;her experience with it?",
            "time" : 1630541538,
            "title" : "Ask HN: Anyone using f2fs in real-life scenarios?",
            "type" : "story"
        }
        let comment = {
            "by" : "throwaway888abc",
            "id" : 28387760,
            "parent" : 28387166,
            "text" : "Put it on my laptop (with ssd) for my workholic use. Heavy development,docker,K8s, javascript&#x2F;node&#x2F;webpack, browsing, etc.etc. etc.<p>10 months+ no issues (with Manjaro on &#x2F;), really happy with it. The performance jump was really noticeable (subjectively).<p>Last week updated kernel branch from 5.4 to 5.10 (wifi card finally works on 5.10, knock,knock) and again no issues at all.<p>Various articles and benchmarks:\n<a href=\"https:&#x2F;&#x2F;www.phoronix.com&#x2F;scan.php?page=search&amp;q=F2FS\" rel=\"nofollow\">https:&#x2F;&#x2F;www.phoronix.com&#x2F;scan.php?page=search&amp;q=F2FS</a><p>Recommending.",
            "time" : 1630546858,
            "type" : "comment"
        }
        const component = renderer.create(
            <AskDetails details={d} hasComment={true} comment={comment}/>,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        //   console.info(tree.props);
        //   console.info(component);
    });
})
