# **CurioMart - E-Commerce Platform**

<!--
(curiomart.iamharsh.in) -->

Live = https://curiomart.iamharsh.in

**CurioMart** is a comprehensive **MERN Stack** application designed to empower entrepreneurs by simplifying e-commerce site deployment. With features tailored for functionality, scalability, and customization, this platform includes a seller/vendor CMS, a responsive admin dashboard, real-time chat support, and secure payment integration via Stripe.

---

## 🚀 **Key Features**

- **Admin Dashboard**: Fully responsive and intuitive interface for managing orders, products, and users.
- **Secure Authentication**: User authentication powered by **JWT** for robust security.
- **Real-Time Chat**: Instant customer and support interaction using **Socket.IO**.
- **Payment Gateway**: Seamless, secure payment processing with **Stripe** integration.
- **Customizable Design**: Modular codebase allows for easy adaptation to business-specific needs.
- **Geolocation Support**: Integrated location-based services via the **country-state-city** library.

---

## 🛠️ **Technologies Used**

### **Frontend**

- **React.js**: For building dynamic, interactive user interfaces.
- **Redux Toolkit**: Efficient state management for smooth user experience.
- **Material-UI & Tailwind CSS**: Sleek, responsive design frameworks.
- **React Icons**: Beautiful, customizable icons.
- **React Toastify**: Instant feedback and notification system.

### **Backend**

- **Node.js & Express.js**: Reliable server-side logic and API development.
- **MongoDB**: A scalable, NoSQL database for managing data.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB and Node.js.
- **Stripe SDK**: Simplified payment gateway integration.
- **Nodemailer**: Email support for user notifications and updates.

### **Real-Time Chat**

- **Socket.IO**: Real-time, event-based communication for customer support.

### **DevOps & Tools**

- **Nodemon**: Automatic server restarts during development.
- **dotenv**: Secure management of environment variables.

---

## 📂 **Project Structure**

### **Frontend**

```plaintext
/src
  ├── components    // Reusable UI components
  ├── pages         // Page-level components
  ├── redux         // State management files
  ├── styles        // CSS and styling files
  └── utils         // Utility functions
```

### **Backend**

```plaintext
/
  ├── controllers   // Business logic and request handling
  ├── models        // Database schema definitions
  ├── routes        // API route handlers
  └── utils         // Helper functions
```

### **Socket Server**

```plaintext
/
  ├── index.js      // Entry point for real-time server
```

---

## 🖼️ **Asset Management (Cloudinary)**

All image uploads (product images, event images, user/shop avatars, and chat
attachments) go through a single, consistent pipeline instead of being stored
on local disk:

```plaintext
Client (multipart/form-data)
        │
        ▼
  multer (backend/multer.js)
  writes the file to backend/public/temp
        │
        ▼
  uploadOnCloudinary (backend/utils/cloudinary.js)
  uploads to Cloudinary with automatic retries,
  then deletes the local temp file
        │
        ▼
  { public_id, url } saved on the Mongo document
```

**Key pieces**

- `backend/multer.js` — multer disk storage that writes incoming files to
  `backend/public/temp` (a scratch directory, not served statically and not a
  long-term store).
- `backend/utils/cloudinary.js` — exposes `uploadOnCloudinary(localFilePath, { folder })`
  and `deleteFromCloudinary(publicId)`. Uploads retry up to 3 times before
  giving up, and the local temp file is always cleaned up (`safeUnlink`)
  whether the upload succeeds or ultimately fails.
- Every document that stores an image persists it as `{ public_id, url }`
  (or an array of these for multi-image fields), never a bare filename:
  - `Product.images` / `Event.images` — array of `{ public_id, url }`
  - `User.avatar` / `Shop.avatar` — single `{ public_id, url }`
  - `Messages.images` — optional single `{ public_id, url }` chat attachment

**Cloudinary folders used per asset type**

| Asset               | Folder                      |
| ------------------- | --------------------------- |
| Product images      | `curiomart-server/products` |
| Event images        | `curiomart-server/events`   |
| User avatars        | `curiomart-server/users`    |
| Shop/seller avatars | `curiomart-server/shops`    |
| Chat attachments    | `curiomart-server/messages` |

**Create / update / delete conventions**

- **Create**: files are uploaded to Cloudinary in parallel; if any upload
  permanently fails, any images that _did_ succeed are rolled back
  (`deleteFromCloudinary`) so no orphaned assets are left behind, and the
  request fails cleanly.
- **Update** (e.g. `update-shop-product`, avatar updates): the old Cloudinary
  asset is only deleted once the new one has been uploaded successfully.
- **Delete** (products, events, users, sellers): the corresponding Cloudinary
  asset(s) are deleted via `deleteFromCloudinary` before/alongside removing
  the Mongo document, so Cloudinary storage doesn't accumulate orphaned files.

**Frontend**

- The frontend never talks to Cloudinary directly — it uploads files to the
  backend via the same `multipart/form-data` field names as before
  (`images`, `file`, `image`), and the backend returns the persisted
  `{ public_id, url }` (or array of them).
- Every place that renders an image reads the `url` field via a single shared
  helper, `frontend/src/utils/getImageUrl.js`, instead of concatenating a
  backend base URL with a filename.

**Environment variables required (`backend/config/.env`)**

```plaintext
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Note on the legacy `uploads/` folder**

`backend/app.js` still serves `backend/uploads` statically for backward
compatibility with any records created before this migration. No new write
path (create/update) uses that folder anymore — all new and replaced images
go through Cloudinary as described above.

---

## 🧑‍💻 **Best Practices Followed**

- **Code Modularity**: Clear separation of concerns for maintainable, scalable code.
- **RESTful API Design**: Standardized API endpoints for seamless client-server interaction.
- **Secure Authentication**: Advanced JWT-based access control.
- **Real-Time Architecture**: Event-driven approach for real-time communication.
- **Responsive Design**: Fully optimized for both mobile and desktop experiences.

---

## 📞 **Contact**

For any queries or support, feel free to reach out:

- **Email**: [harshprajapati0123@gmail.com](mailto:harshprajapati0123@gmail.com)
- **LinkedIn**: [Harsh Prajapati](https://www.linkedin.com/in/harsh-prajapati-developer/)
- **Portfolio**: [iamharsh.in](https://iamharsh.in)