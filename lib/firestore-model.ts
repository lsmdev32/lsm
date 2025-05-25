import { collection, doc, serverTimestamp } from "firebase/firestore"
import type {
	Timestamp,
	QueryDocumentSnapshot,
	SnapshotOptions,
	Firestore,
} from "firebase/firestore"
import type { StaffType } from "~/lib/schemas/form"

type CommonAppModelType = {
	id?: string
	created_at?: Date
	updated_at?: Date
}

interface CommonDocumentType {
	created_at: Timestamp
	updated_at: Timestamp
}

type AppModelOfType<T extends Record<string, unknown>> = Exclude<T, keyof CommonAppModelType> & CommonAppModelType
type DocumentModelOfType<T extends Record<string, unknown>> = Exclude<T, keyof CommonDocumentType> & CommonDocumentType

const createFirestoreConverter = <
	AppModel extends CommonAppModelType,
	DocumentModel extends CommonDocumentType>() => {
	return {
		toFirestore: (item: AppModel) => {
			const created_at = item.created_at
				? item.created_at
				: serverTimestamp()

			const updated_at = serverTimestamp()

			const { id, ...data } = item

			return {
				...data,
				created_at,
				updated_at,
			}
		},
		fromFirestore: (
			snapshot: QueryDocumentSnapshot<DocumentModel>,
			options?: SnapshotOptions,
		) => {
			const data = snapshot.data(options)
			const created_at = data.created_at?.toDate()
			const updated_at = data.updated_at?.toDate()
			return {
				...data,
				id: snapshot.id,
				created_at,
				updated_at,
			}
		},
	}
}

type StaffTypes = keyof StaffType

export type StaffAppModel = AppModelOfType<{
	type: StaffTypes
	profile_picture_url: string
	fullname: string
	slug: string
	email: string
	linkedin_url: string
	short_bio: string
	bio: string
	cv_url: string
}>

type StaffDocumentModel = DocumentModelOfType<{
	type: StaffTypes
	profile_picture_url: string
	fullname: string
	slug: string
	email: string
	linkedin_url: string
	short_bio: string
	bio: string
	cv_url: string
}>

export type CategoryAppModel = AppModelOfType<{
	name: string
}>

type CategoryDocumentModel = DocumentModelOfType<{
	name: string
}>

export type BlogAppModel = AppModelOfType<{
	title: string
	slug: string
	cover_image_url: string
	content: string
	status: "draft" | "published"
	author_id: string
	category_id: string
}>

export type BlogDocumentModel = DocumentModelOfType<{
	title: string
	slug: string
	cover_image_url: string
	content: string
	status: "draft" | "published"
	author_id: string
	category_id: string
}>

const staffConverter = createFirestoreConverter<StaffAppModel, StaffDocumentModel>()
const categoryConverter = createFirestoreConverter<CategoryAppModel, CategoryDocumentModel>()
const blogsConverter = createFirestoreConverter<BlogAppModel, BlogDocumentModel>()

const map = {
	staff: [
		"staffs", staffConverter,
	],
} as const

type CollectionNames = keyof typeof map

export function getDocRef(firestore: Firestore, name: CollectionNames, id?: string) {
	const d = id ? doc(firestore, map[name][0], id) : doc(firestore, map[name][0])
	return d.withConverter(map[name][1])
}

export function getCollectionRef(firestore: Firestore, name: CollectionNames) {
	return collection(firestore, map[name][0])
		.withConverter(map[name][1])
}

export function getCategoryCollectionRef(firestore: Firestore) {
	return collection(firestore, "categories")
		.withConverter(categoryConverter)
}

export function getCategoryDocRef(firestore: Firestore, id: string) {
	return doc(firestore, "categories", id)
		.withConverter(categoryConverter)
}

export function getBlogCollectionRef(firestore: Firestore) {
	return collection(firestore, "blogs")
		.withConverter(blogsConverter)
}

export function getBlogDocRef(firestore: Firestore, id: string) {
	return doc(firestore, "blogs", id)
		.withConverter(blogsConverter)
}
