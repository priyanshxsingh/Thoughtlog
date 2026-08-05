import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.create({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,

        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: config :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,

        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: config :: updatePost :: error ", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: config :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: config :: getPost :: error ", error);
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        queries: [Query.equal("Status", "active")],
      });
    } catch (error) {
      console.log("Appwrite service :: config :: getPosts :: error ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: document.getElementById('uploader').files[0]
      });
    } catch (error) {
      console.log("Appwrite service :: config :: uploadFile :: error ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: config :: deleteFile :: error ", error);
      return false;
    }
  }

  getFilePreview(fileId){
    return await this.databases.getFilePreview({
    bucketId: conf.appwriteBucketId,
    fileId: fileId,
    });
  }
}

const service = new Service();

export default service;
