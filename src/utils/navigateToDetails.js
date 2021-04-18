export default function ({ navigate }, id) {
    var newId = id.match(/\d/g);
    newId = newId.join("");
    navigate("Details", { id: newId });
}