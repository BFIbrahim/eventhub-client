import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";

const Profile = () => {
  const { user, updateUserProfile } = UseAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photo: ""
  });


  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEdit && user) {
      setProfileData({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || ""
      });
    }
    setIsEdit(!isEdit);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateUserProfile({
        displayName: profileData.name,
        photoURL: profileData.photo,
      });

      alert("Profile updated successfully");
      setIsEdit(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">My Profile</h2>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={profileData.photo || "https://i.ibb.co/ZYW3VTp/boy.png"}
            alt="profile"
            className="w-28 h-28 rounded-full border object-cover"
          />

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold">
              {profileData.name || "User Name"}
            </h3>
            <p className="text-gray-500">{profileData.email}</p>
          </div>

          <div className="md:ml-auto">
            <button
              onClick={handleEditToggle}
              className="btn btn-outline btn-sm flex items-center gap-2"
            >
              <FaUserEdit />
              {isEdit ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEdit}
              className={`input input-bordered w-full ${
                !isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div>
            <label className="label">Profile Photo URL</label>
            <input
              type="text"
              name="photo"
              value={profileData.photo}
              onChange={handleChange}
              disabled={!isEdit}
              className={`input input-bordered w-full ${
                !isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {isEdit && (
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
