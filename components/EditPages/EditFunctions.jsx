import { showToast } from "@components/Dashboard/Toast";
import Api from "@services/Api";
import { CardData } from "@services/Routes";
import Swal from "sweetalert2";

export const handleActive = async ({ section_name, Visible_name, Active, setActive }) => {
    console.log(section_name, Visible_name);

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