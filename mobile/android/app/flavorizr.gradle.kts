import com.android.build.gradle.AppExtension

val android = project.extensions.getByType(AppExtension::class.java)

android.apply {
    flavorDimensions("flavor-type")

    productFlavors {
        create("dev") {
            dimension = "flavor-type"
            applicationId = "com.example.linkbeet.dev"
            resValue(type = "string", name = "app_name", value = "LinkBeet Dev")
        }
        create("stage") {
            dimension = "flavor-type"
            applicationId = "com.example.linkbeet.stage"
            resValue(type = "string", name = "app_name", value = "LinkBeet Stage")
        }
        create("prod") {
            dimension = "flavor-type"
            applicationId = "com.example.linkbeet.app"
            resValue(type = "string", name = "app_name", value = "LinkBeet")
        }
    }
}