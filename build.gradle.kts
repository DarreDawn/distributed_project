plugins {
    id("java")
    id("com.github.johnrengelman.shadow") version "7.0.0"
    id ("org.springframework.boot") version "2.4.5"
    id ("io.spring.dependency-management") version "1.0.11.RELEASE"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.springframework.boot:spring-boot-starter-web")
}

tasks.shadowJar {
    archiveBaseName.set("your-app")
    archiveVersion.set("0.1.0")
    archiveClassifier.set("")
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
    dependsOn("build")
}



