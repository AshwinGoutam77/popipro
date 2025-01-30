import { showToast } from "@components/Dashboard/Toast";
import Api from "@services/Api";
import { CardData, PublishSection } from "@services/Routes";
import Swal from "sweetalert2";

export const handleActive = async ({ section_name, Visible_name, Active, setActive }) => {
    const titles = [
        {
            name: section_name,
            visible_name: Visible_name,
            is_featured: Active ? "0" : "1",
            is_active: Active ? "0" : "1",
        },
    ];
    Swal.fire({
        title: "Are you sure?",
        text:
            Active == 1
                ? "You want to hide this section from your profile?"
                : "You want to show this section on your profile?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(24 123 249)",
        cancelButtonColor: "#d33",
        confirmButtonText: Active == 1 ? "Yes hide it!" : "Yes show it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await Api(CardData, { titles });
                if (response.status) {
                    setActive((prev) => !prev);
                }
            } catch (error) {
                if (error.request.status == "401") {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }

                showToast(error.response.data.message, "error");
            }
        }
    });
};

export const handleDraft = async ({ card_url, status, product_id, APIDATA, item_name, card_section }) => {
    let data = {
        card_id: card_url,
        status: status,
        target_type: card_section,
        target_id: product_id
    }
    Swal.fire({
        title: "Are you sure?",
        text: status == 0 ? `You want to draft ${item_name}` : `You want to publish ${item_name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(99 171 187)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await Api(PublishSection, data);
            if (response.data.status) {
                Swal.fire(status == 0 ? "Draft Successfully" : "Published Successfully", "", "success");
                APIDATA();
            }
        }
    });
}