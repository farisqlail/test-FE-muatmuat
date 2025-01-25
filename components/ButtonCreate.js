export default function Button({ icon, onOpenAdd }) {
    const handleOpenAdd = () => {
        onOpenAdd();
      };

    return (
        <button className="border border-success p-2 rounded-full" onClick={() => handleOpenAdd()}>
            {icon}
        </button>
    )
}