import MemberNameCell from "./MemberNameCell"

const MemberNameRaw = async () => {
    try {
        const membersRes = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/members`);
        if (!membersRes.ok) {
            // APIのレスポンスが正常でない場合
            console.error('Failed to fetch the members');
            return <div>メンバーが見つかりません</div>;
        }
        const data = await membersRes.json();
        const members: Member[] = data.members; // レスポンスからmembers配列を取得
        return (
            <>
                {members.map(member => (
                    <MemberNameCell key={member.id} id={member.id} name={member.name} />
                ))}
            </>
        )
    } catch (error) {
        console.error('Error fetching members:', error);
        return <div>メンバーが見つかりません</div>;
    }
}

export default MemberNameRaw