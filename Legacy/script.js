const searchInput = document.getElementById("search");
const iconList = document.getElementById("resultContainer");

const searchIcons = async (searchBox) => {
    try {
        const res = await fetch("js/icon_list.json");
        if (!res.ok) {
            throw new Error(`Failed to fetch JSON: ${res.status} - ${res.statusText}`);
        }
        const icondata = await res.json();

        let matches = icondata.icons.filter((icon) => {
            const regex = new RegExp(searchBox, "gi");
            return icon.match(regex);
        });

        if (searchBox.length === 0) {
            matches = [];
        }

        outputHtml(matches);
    } catch (error) {
        console.error(error);
    }
};

const outputHtml = (matches) => {
    if (matches.length > 0) {
        const html = matches
            .map(
                (icon) =>
                    `
                    <div class="inventory-item">
                        <a href="https://raw.githubusercontent.com/coder-soft/icons/main/icons-1.21/${icon}" download target="_blank">
                            <img src="https://raw.githubusercontent.com/coder-soft/icons/main/icons-1.21-thumb/${icon}" alt="${icon}" title="${icon}">
                        </a>
                    </div>
                `
            )
            .join("");
        iconList.innerHTML = html;
    } else {
        iconList.innerHTML = "<p>No icons found.</p>";
    }
};

searchInput.addEventListener("input", () => searchIcons(searchInput.value));

// Load all icons on page load
window.addEventListener("load", () => {
    searchIcons("");
});
