plugins {
    id("java")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("javax.servlet:javax.servlet-api:4.0.1")
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}
tasks.jar {
    archiveBaseName.set(rootProject.name) // JAR文件的基础名称
    archiveVersion.set("1.0.0")           // JAR文件的版本
    archiveClassifier.set("")             // 构建的分类符，通常对于主构建是空的

    from(sourceSets.main.get().output)

    // 设置入口点，如果你有一个主类
    manifest {
        attributes(
            "Main-Class" to "org.example.Main" // 替换为你的主类
        )
    }
}

tasks {
    register<Copy>("copyToLib") {
        into(layout.buildDirectory.dir("libs"))
        from(configurations.runtimeClasspath)
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
tasks.register("stage") {
    dependsOn("clean", "build")
    doLast {
        println("Staging the application!")
    }
}




