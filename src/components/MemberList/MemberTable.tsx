import MemberTableRaw from "./MemberTableRaw"
import MemberTableHead from "./MemberTableHead"
import MemberTableCell from "./MemberTableCell"
import MemberNameRaw from "./MemberNameRaw"

const MemberTable = () => {
  return (
    <div className="flex overflow-x-hidden">
      <MemberTableRaw>
        <MemberTableHead className="px-6">名前</MemberTableHead>
        <MemberNameRaw />
      </MemberTableRaw>
      <MemberTableRaw>
        <MemberTableHead>学年</MemberTableHead>
        <MemberTableCell>3</MemberTableCell>
        <MemberTableCell>3</MemberTableCell>
        <MemberTableCell>3</MemberTableCell>
      </MemberTableRaw>
      <MemberTableRaw>
        <MemberTableHead>所属</MemberTableHead>
        <MemberTableCell>制作局</MemberTableCell>
        <MemberTableCell>制作局</MemberTableCell>
        <MemberTableCell>制作局</MemberTableCell>
      </MemberTableRaw>
      <MemberTableRaw>
        <MemberTableHead>役職</MemberTableHead>
        <MemberTableCell>三年会</MemberTableCell>
        <MemberTableCell>局長</MemberTableCell>
        <MemberTableCell>副局長</MemberTableCell>
      </MemberTableRaw>
    </div>
  )
}

export default MemberTable